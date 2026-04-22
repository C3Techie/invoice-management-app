import React, { useState, useEffect } from 'react';
import { useInvoices } from '../lib/contexts/InvoiceContext';
import { Invoice, InvoiceItem, InvoiceStatus } from '../types/invoice';
import { Button } from './ui/button';
import { Typography } from './ui/Typography';
import { Trash2 } from 'lucide-react';
import { generateInvoiceId, getPaymentDueDate } from '../lib/utils/invoice';
import { Input } from './ui/Input';
import { CustomSelect } from './ui/CustomSelect';
import { DatePicker } from './ui/DatePicker';

interface InvoiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceToEdit?: Invoice;
}

const EMPTY_ITEM: Omit<InvoiceItem, 'id'> = {
  name: '',
  quantity: 1,
  price: 0,
  total: 0,
};

const PAYMENT_TERMS_OPTIONS = [
  { label: 'Net 1 Day', value: 1 },
  { label: 'Net 7 Days', value: 7 },
  { label: 'Net 14 Days', value: 14 },
  { label: 'Net 30 Days', value: 30 },
];

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ 
  isOpen, 
  onClose, 
  invoiceToEdit 
}) => {
  const { addInvoice, updateInvoice } = useInvoices();
  
  const [formData, setFormData] = useState<Partial<Invoice>>({
    description: '',
    paymentTerms: 30,
    clientName: '',
    clientEmail: '',
    senderAddress: { street: '', city: '', postCode: '', country: '' },
    clientAddress: { street: '', city: '', postCode: '', country: '' },
    items: [],
    status: 'pending' as InvoiceStatus,
    createdAt: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (invoiceToEdit) {
      setFormData(invoiceToEdit);
    } else {
      setFormData({
        description: '',
        paymentTerms: 30,
        clientName: '',
        clientEmail: '',
        senderAddress: { street: '', city: '', postCode: '', country: '' },
        clientAddress: { street: '', city: '', postCode: '', country: '' },
        items: [],
        status: 'pending' as InvoiceStatus,
        createdAt: new Date().toISOString().split('T')[0],
      });
    }
    setErrors({});
  }, [invoiceToEdit, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof Invoice, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleAddressChange = (type: 'senderAddress' | 'clientAddress', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }));
    const errorKey = `${type}.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    setFormData(prev => {
      const newItems = [...(prev.items || [])];
      const item = { ...newItems[index], [field]: value };
      
      if (field === 'quantity' || field === 'price') {
        item.total = Number(item.quantity) * Number(item.price);
      }
      
      newItems[index] = item as InvoiceItem;
      return { ...prev, items: newItems };
    });
    const errorKey = `items.${index}.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...(prev.items || []), { ...EMPTY_ITEM, id: Math.random().toString(36).substr(2, 9) } as InvoiceItem]
    }));
  };

  const deleteItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: (prev.items || []).filter((_, i) => i !== index)
    }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, boolean> = {};

    if (!formData.description) newErrors.description = true;
    if (!formData.clientName) newErrors.clientName = true;
    if (!formData.clientEmail) newErrors.clientEmail = true;

    ['senderAddress', 'clientAddress'].forEach((type) => {
      const addr = formData[type as 'senderAddress' | 'clientAddress']!;
      ['street', 'city', 'postCode', 'country'].forEach((field) => {
        if (!addr[field as keyof typeof addr]) {
          newErrors[`${type}.${field}`] = true;
        }
      });
    });

    if (!formData.items || formData.items.length === 0) {
      newErrors.itemsList = true;
    } else {
      formData.items.forEach((item, index) => {
        if (!item.name) newErrors[`items.${index}.name`] = true;
        if (item.quantity <= 0) newErrors[`items.${index}.quantity`] = true;
        if (item.price <= 0) newErrors[`items.${index}.price`] = true;
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (status?: InvoiceStatus) => {
    if (status !== 'draft' && !validate()) return;

    const finalStatus = status || formData.status || 'pending';
    const total = (formData.items || []).reduce((sum, item) => sum + item.total, 0);
    const paymentDue = getPaymentDueDate(formData.createdAt!, formData.paymentTerms!);

    const finalData: Invoice = {
      ...(formData as Invoice),
      id: invoiceToEdit?.id || generateInvoiceId().replace('#', ''),
      status: finalStatus as InvoiceStatus,
      total,
      paymentDue
    };

    if (invoiceToEdit) {
      updateInvoice(invoiceToEdit.id, finalData);
    } else {
      addInvoice(finalData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative h-screen w-full max-w-[719px] flex-col bg-white overflow-y-auto dark:bg-[#141625] lg:rounded-r-[20px] animate-in slide-in-from-left duration-300 lg:pl-[103px]">
        <div className="p-8 pb-32 pt-[112px] md:p-14 md:pt-[112px] lg:pt-[56px]">
          {/* Go Back Link - Mobile/Tablet Only */}
          <button
            onClick={onClose}
            className="mb-6 flex items-center gap-6 md:hidden font-spartan text-[15px] font-bold tracking-[-0.25px] text-[#0C0E16] dark:text-white"
          >
            <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" strokeWidth="2" fill="none" fillRule="evenodd"/>
            </svg>
            <span>Go back</span>
          </button>

          <Typography variant="heading-m" className="mb-[46px]">
            {invoiceToEdit ? <>Edit <span className="text-[#888EB0]">#</span>{invoiceToEdit.id}</> : 'New Invoice'}
          </Typography>

          <form className="flex flex-col gap-12" onSubmit={(e) => e.preventDefault()}>
            <section>
              <Typography variant="body" className="mb-6 block font-bold text-primary">Bill From</Typography>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-3">
                  <Input label="Street Address" value={formData.senderAddress?.street} onChange={(e) => handleAddressChange('senderAddress', 'street', e.target.value)} error={errors['senderAddress.street']} />
                </div>
                <div>
                  <Input label="City" value={formData.senderAddress?.city} onChange={(e) => handleAddressChange('senderAddress', 'city', e.target.value)} error={errors['senderAddress.city']} />
                </div>
                <div>
                  <Input label="Post Code" value={formData.senderAddress?.postCode} onChange={(e) => handleAddressChange('senderAddress', 'postCode', e.target.value)} error={errors['senderAddress.postCode']} />
                </div>
                <div>
                  <Input label="Country" value={formData.senderAddress?.country} onChange={(e) => handleAddressChange('senderAddress', 'country', e.target.value)} error={errors['senderAddress.country']} />
                </div>
              </div>
            </section>

            <section>
              <Typography variant="body" className="mb-6 block font-bold text-primary">Bill To</Typography>
              <div className="flex flex-col gap-6">
                <div>
                  <Input label="Client's Name" value={formData.clientName} onChange={(e) => handleInputChange('clientName', e.target.value)} error={errors.clientName} />
                </div>
                <div>
                  <Input label="Client's Email" type="email" value={formData.clientEmail} onChange={(e) => handleInputChange('clientEmail', e.target.value)} error={errors.clientEmail} />
                </div>
                <div>
                  <Input label="Street Address" value={formData.clientAddress?.street} onChange={(e) => handleAddressChange('clientAddress', 'street', e.target.value)} error={errors['clientAddress.street']} />
                </div>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                  <div className="max-md:col-span-1">
                    <Input label="City" value={formData.clientAddress?.city} onChange={(e) => handleAddressChange('clientAddress', 'city', e.target.value)} error={errors['clientAddress.city']} />
                  </div>
                  <div className="max-md:col-span-1">
                    <Input label="Post Code" value={formData.clientAddress?.postCode} onChange={(e) => handleAddressChange('clientAddress', 'postCode', e.target.value)} error={errors['clientAddress.postCode']} />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <Input label="Country" value={formData.clientAddress?.country} onChange={(e) => handleAddressChange('clientAddress', 'country', e.target.value)} error={errors['clientAddress.country']} />
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <DatePicker label="Invoice Date" value={formData.createdAt!} onChange={(val) => handleInputChange('createdAt', val)} error={errors.createdAt} />
              </div>
              <div>
                <CustomSelect label="Payment Terms" options={PAYMENT_TERMS_OPTIONS} value={formData.paymentTerms!} onChange={(val) => handleInputChange('paymentTerms', val)} />
              </div>
              <div className="md:col-span-2">
                <Input label="Project Description" value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} error={errors.description} />
              </div>
            </section>

            <section>
              <div className="mb-4">
                <Typography variant="heading-s" className="text-[#777BB1] text-[18px]">Item List</Typography>
                {errors.itemsList && (
                  <span className="font-spartan text-[10px] font-semibold text-[#EC5757]">
                    - An item must be added
                  </span>
                )}
              </div>
              
              <div className="hidden md:grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-4"><Typography variant="body" className="text-[#7E88C3] dark:text-[#888EB0]">Item Name</Typography></div>
                <div className="col-span-2"><Typography variant="body" className="text-[#7E88C3] dark:text-[#888EB0]">Qty.</Typography></div>
                <div className="col-span-3"><Typography variant="body" className="text-[#7E88C3] dark:text-[#888EB0]">Price</Typography></div>
                <div className="col-span-2"><Typography variant="body" className="text-[#7E88C3] dark:text-[#888EB0]">Total</Typography></div>
              </div>

              <div className="flex flex-col gap-4">
                {formData.items?.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-start md:items-center">
                    <div className="col-span-12 md:col-span-4">
                      <Input label="Item Name" hideLabelOnDesktop value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} error={errors[`items.${index}.name`]} />
                    </div>
                    <div className="col-span-3 md:col-span-2">
                      <Input label="Qty." type="number" hideLabelOnDesktop value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))} error={errors[`items.${index}.quantity`]} />
                    </div>
                    <div className="col-span-4 md:col-span-3">
                      <Input label="Price" type="number" hideLabelOnDesktop value={item.price} onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))} error={errors[`items.${index}.price`]} />
                    </div>
                    <div className="col-span-3 md:col-span-2 flex flex-col gap-2">
                      <label className="block md:hidden font-spartan text-[13px] font-medium text-[#7E88C3] dark:text-[#888EB0]">Total</label>
                      <div className="flex h-12 items-center font-bold text-[#888EB0] dark:text-[#DFE3FA]">
                        {item.total.toFixed(2)}
                      </div>
                    </div>
                    <button onClick={() => deleteItem(index)} className="col-span-2 md:col-span-1 flex h-12 items-center justify-center text-[#888EB0] hover:text-[#EC5757] transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
                
                <div className="mt-4">
                  <Button variant="addItem" className="md:w-[504px]" onClick={addItem}>
                    + Add New Item
                  </Button>
                </div>
              </div>
            </section>
            
            {Object.keys(errors).length > 0 && (
              <div className="text-[#EC5757] text-[10px] font-semibold">
                - All fields must be added
              </div>
            )}
          </form>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 mt-auto flex justify-between items-center bg-white p-4 md:p-8 dark:bg-[#141625] shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-20">
            <div className="shrink-0">
              <Button variant="edit" className="w-[84px] md:w-[96px]" onClick={onClose}>
                {invoiceToEdit ? 'Cancel' : 'Discard'}
              </Button>
            </div>
            
            <div className="flex gap-2 shrink-0">
              {!invoiceToEdit && (
                <Button 
                  variant="draft" 
                  name="draft-button" 
                  className="w-[117px] md:w-[133px] text-[12px] md:text-[15px] px-0" 
                  onClick={() => handleSubmit('draft')}
                >
                  Save as Draft
                </Button>
              )}
              <Button 
                variant="default" 
                name="send-button" 
                className="w-[112px] md:w-[128px] text-[12px] md:text-[15px] px-0" 
                onClick={() => handleSubmit(invoiceToEdit ? invoiceToEdit.status : 'pending')}
              >
                {invoiceToEdit ? 'Save Changes' : 'Save & Send'}
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
};
