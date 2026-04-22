import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[24px] text-[15px] font-bold font-spartan transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] tracking-[-0.25px]",
  {
    variants: {
      variant: {
        // Button 2 - Mark as Paid / Standard Primary
        default: 'h-[48px] w-[131px] bg-[#7C5DFA] text-white hover:bg-[#9277FF]',
        // Button 5 - Delete
        destructive: 'h-[48px] w-[89px] bg-[#EC5757] text-white hover:bg-[#FF9797]',
        outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // Button 1 - New Invoice
        newInvoice: 'h-[44px] md:h-[48px] w-[90px] md:w-[150px] bg-[#7C5DFA] text-white hover:bg-[#9277FF] justify-start p-2 relative shrink-0',
        // Button 3 - Edit (Light/Dark)
        edit: 'h-[48px] w-[73px] bg-[#F9FAFE] text-[#7E88C3] hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-[#DFE3FA] dark:hover:bg-white dark:hover:text-[#7E88C3]',
        // Button 4 - Save as Draft (Light/Dark)
        draft: 'h-[48px] w-[133px] bg-[#373B53] text-[#888EB0] hover:bg-[#0C0E16] dark:text-[#DFE3FA] dark:hover:bg-[#1E2139]',
        // Button 6 - Add New Item
        addItem: 'h-[48px] w-full bg-[#F9FAFE] text-[#7E88C3] hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-[#7E88C3] dark:hover:bg-[#1E2139]',
      },
      size: {
        default: 'h-12',
        sm: 'h-8 px-3',
        lg: 'h-10 px-6',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  if (variant === 'newInvoice') {
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white ml-0 mr-2 md:mr-4 shrink-0 transition-transform group-hover:scale-110">
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.313 10.036v-3.724h3.724V3.712H6.313V0H3.724v3.712H0v2.6h3.724v3.724h2.589z" fill="#7C5DFA" fillRule="nonzero"/>
          </svg>
        </span>
        <span className="translate-y-[-1px]">
          <span className="md:hidden">New</span>
          <span className="hidden md:inline">{children}</span>
        </span>
      </Comp>
    )
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {props.name === 'draft-button' ? (
        <>
          <span className="md:hidden">Draft</span>
          <span className="hidden md:inline">{children}</span>
        </>
      ) : props.name === 'send-button' ? (
        <>
          <span className="md:hidden">Send</span>
          <span className="hidden md:inline">{children}</span>
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
