import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const divVariants = cva("yflex yflex-col yitems-center yjustify-center", {
  variants: {
    alignment: {
      center: "yitems-center yjustify-center",
      start: "yitems-start yjustify-start",
      end: "yitems-end yjustify-end",
    },
  },
  defaultVariants: {
    alignment: "center",
  },
});

export interface DivProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof divVariants> {
  asChild?: boolean;
}

const Div = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, alignment, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(
          divVariants({ alignment, className }),
          // Remove margins or padding on the sides
          "mt-4",
          "divide-y divide-gray-200"
        )}
        ref={ref}
        {...props}
      >
        {/* Apply vertical margin between children */}
        {React.Children.map(props.children, (child, index) => (
          <React.Fragment key={index}>
            {/* Check if child is not null */}
            {child && (
              <>
                {index > 0 && (
                  <div className="my-4">
                    {/* Add margin top and bottom to adjacent items */}
                    {React.cloneElement(child as React.ReactElement, {
                      className: cn(
                        (child as React.ReactElement).props.className,
                        "mt-4",
                        "mb-4"
                      ),
                    })}
                  </div>
                )}
                {index === 0 && (
                  <div className="mb-4">
                    {/* Add margin bottom to the first item */}
                    {React.cloneElement(child as React.ReactElement, {
                      className: cn(
                        (child as React.ReactElement).props.className,
                        "mb-4"
                      ),
                    })}
                  </div>
                )}
              </>
            )}
          </React.Fragment>
        ))}
      </Comp>
    );
  }
);
Div.displayName = "Div";

export { Div, divVariants };
