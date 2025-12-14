import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:scale-[1.03]",

        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",

        outline:
          "border border-border bg-transparent hover:bg-accent/30 hover:text-accent-foreground",

        ghost: "bg-transparent hover:bg-accent/20",

        destructive: "bg-destructive text-white shadow hover:bg-destructive/90",

        nail: "relative bg-gradient-to-r from-[oklch(0.72_0.18_350)] via-[oklch(0.78_0.16_20)] to-[oklch(0.85_0.12_30)] text-white shadow-md bg-[length:200%_200%] bg-[position:0%_50%] transition-[background-position,box-shadow] duration-500 ease-in-out hover:bg-[position:100%_50%] hover:shadow-lg",
      },

      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "h-11 w-11",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
