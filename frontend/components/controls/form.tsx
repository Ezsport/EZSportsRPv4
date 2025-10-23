import React, {
  ReactNode,
  cloneElement,
  isValidElement,
  forwardRef,
  Ref,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form as UIForm,
  FormItem as UIFormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import PickerAvatar from "@/components/pickers/picker-avatar";

// Type for form item configuration
type FormItemConfig = {
  label?: string;
  schema: z.ZodType<any>;
  control: React.ReactElement;
  description?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
};

// Type for form configuration
type FormConfig = {
  [key: string]: FormItemConfig;
};

// Form component props
type FormProps = {
  config: FormConfig;
  onSubmit: (data: any) => void;
  onValidation?: (errors: any) => void;
  children: React.ReactNode;
  className?: string;
  initialValues?: Record<string, any>; // Add this line
};

export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      config,
      onSubmit,
      onValidation,
      children,
      className,
      initialValues = {}, // Add default empty object
    },
    ref
  ) => {
    // Ensure ref is a valid RefObject
    const formRef = React.useRef<HTMLFormElement>(null);
    React.useImperativeHandle(ref, () => formRef.current as HTMLFormElement);

    // Dynamically create Zod schema from config
    const schema = z.object(
      Object.fromEntries(
        Object.entries(config).map(([key, item]) => [
          key,
          item.required ? item.schema : item.schema.optional(),
        ])
      )
    );

    // Initialize form with initial values
    const form = useForm({
      resolver: zodResolver(schema),
      mode: "onBlur",
      reValidateMode: "onChange",
      defaultValues: Object.fromEntries(
        Object.entries(config).map(([key, item]) => {
          // Special handling for different input types
          if (item.control.type === Switch) {
            // For Switch, use initialValues or false
            return [key, initialValues?.[key] ?? false];
          }

          if (item.control.type === PickerAvatar) {
            // For AvatarPicker, use initialValues or null
            return [key, initialValues?.[key] ?? null];
          }

          // For standard inputs, use initialValues or empty string
          return [key, initialValues?.[key] ?? ""];
        })
      ),
    });

    // Handle form submission
    const handleSubmit = React.useCallback(
      (data?: any) => {
        // Use form's handleSubmit method
        form.handleSubmit((validData) => {
          onSubmit(validData);
        })();
      },
      [onSubmit, form]
    );

    // Transform children to inject form context
    const renderChildren = (nodes: React.ReactNode): React.ReactNode => {
      return React.Children.map(nodes, (child) => {
        if (!isValidElement(child)) return child;

        // Check if child is FormItem and has a key matching config
        if (child.type === FormItem) {
          const key = child.key as string;
          const itemConfig = config[key.replace(/^\./, "")];

          if (itemConfig) {
            return (
              <FormField
                control={form.control}
                name={key.replace(/^\./, "")}
                render={({ field }) => (
                  <UIFormItem
                    className={cn(
                      itemConfig.className,
                      isValidElement(child)
                        ? (child.props as any)?.className
                        : undefined
                    )}
                  >
                    {itemConfig.label && (
                      <FormLabel className="gap-1">
                        {itemConfig.label}
                        {itemConfig.required && (
                          <span className="text-red-700">*</span>
                        )}
                      </FormLabel>
                    )}
                    <FormControl>
                      {React.cloneElement(itemConfig.control, {
                        ...field,
                        ...(itemConfig.control.type === Switch
                          ? { 
                              checked: field.value,
                              onCheckedChange: field.onChange 
                            }
                          : {}),
                        ...(itemConfig.placeholder
                          ? { placeholder: itemConfig.placeholder }
                          : {}),
                      })}
                    </FormControl>
                    {itemConfig.description && (
                      <FormDescription className="text-xs text-muted-foreground italic">
                        {itemConfig.description}
                      </FormDescription>
                    )}
                    <FormMessage className="text-xs text-red-700 italic" />
                  </UIFormItem>
                )}
              />
            );
          }
        }

        // Recursively transform children
        const childProps = (child.props as Record<string, unknown>) || {};
        const transformedProps: Record<string, unknown> = {};

        for (const key in childProps) {
          if (key === "children" && childProps.children) {
            transformedProps[key] = renderChildren(
              childProps.children as ReactNode
            );
          } else {
            transformedProps[key] = childProps[key];
          }
        }

        return cloneElement(child, transformedProps);
      });
    };

    return (
      <UIForm {...form}>
        <form
          ref={formRef}
          className={className}
          onSubmit={(e) => {
            e.preventDefault();
            
            // Use form's built-in validation and submission
            form.handleSubmit(
              (validData) => {
                onSubmit(validData);
              },
              (errors) => {
                onValidation?.(errors);
              }
            )();
          }}
        >
          {renderChildren(children)}
          <button type="submit" className="hidden" />
        </form>
      </UIForm>
    );
  }
);

export function FormItem({ className }: { className?: string }) {
  // Placeholder component, actual rendering happens in Form component
  return null;
}

// Example usage
function ExampleForm() {
  const formConfig = {
    username: {
      label: "User Name",
      schema: z.string().min(3, "Username must be at least 3 characters"),
      control: <Input className="mb-2" />,
      description: "Choose a unique username",
      required: true,
    },
    password: {
      label: "Password",
      schema: z.string().min(8, "Password must be at least 8 characters"),
      control: <Input type="password" className="mb-2" />,
      description: "Enter a strong password",
      required: true,
    },
  };

  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data);
  };

  return (
    <Form config={formConfig} onSubmit={handleSubmit} className="space-y-4">
      <div>
        <FormItem key="username" />
        <div>
          <div>
            <FormItem key="password" />
          </div>
        </div>
      </div>
    </Form>
  );
}
