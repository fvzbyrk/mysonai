'use client';

import { forwardRef, useRef, useEffect, useState } from 'react';
import { useAccessibilityContext } from './accessibility-provider';
import { cn } from '@/lib/utils';

interface AccessibleFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onError?: (errors: FormErrors) => void;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

interface FormErrors {
  [key: string]: string;
}

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const AccessibleForm = forwardRef<HTMLFormElement, AccessibleFormProps>(
  ({
    children,
    onSubmit,
    onError,
    validateOnChange = true,
    validateOnBlur = true,
    className,
    ...props
  }, ref) => {
    const { announce } = useAccessibilityContext();
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const combinedRef = ref || formRef;

    const validateField = (field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
      const fieldName = field.name;
      const fieldValue = field.value;
      const fieldType = field.type;
      const isRequired = field.hasAttribute('required');
      let error = '';

      // Required field validation
      if (isRequired && !fieldValue.trim()) {
        error = `${fieldName} alanı zorunludur`;
      }

      // Email validation
      if (fieldType === 'email' && fieldValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue)) {
        error = 'Geçerli bir e-posta adresi giriniz';
      }

      // Phone validation
      if (fieldType === 'tel' && fieldValue && !/^[\d\s\-\+\(\)]+$/.test(fieldValue)) {
        error = 'Geçerli bir telefon numarası giriniz';
      }

      // URL validation
      if (fieldType === 'url' && fieldValue && !/^https?:\/\/.+/.test(fieldValue)) {
        error = 'Geçerli bir URL giriniz';
      }

      // Min length validation
      const minLength = field.getAttribute('minlength');
      if (minLength && fieldValue.length < parseInt(minLength)) {
        error = `En az ${minLength} karakter giriniz`;
      }

      // Max length validation
      const maxLength = field.getAttribute('maxlength');
      if (maxLength && fieldValue.length > parseInt(maxLength)) {
        error = `En fazla ${maxLength} karakter giriniz`;
      }

      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));

      return error;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);

      // Validate all fields
      const form = e.currentTarget;
      const fields = form.querySelectorAll('input, textarea, select') as NodeListOf<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
      const newErrors: FormErrors = {};

      fields.forEach(field => {
        const error = validateField(field);
        if (error) {
          newErrors[field.name] = error;
        }
      });

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        announce('Form doğrulama hataları bulundu');
        onError?.(newErrors);
        setIsSubmitting(false);
        return;
      }

      try {
        await onSubmit?.(e);
        announce('Form başarıyla gönderildi');
      } catch (error) {
        announce('Form gönderilirken hata oluştu');
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      if (validateOnChange) {
        validateField(e.target);
      }
    };

    const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      if (validateOnBlur) {
        validateField(e.target);
      }
    };

    return (
      <form
        ref={combinedRef}
        onSubmit={handleSubmit}
        className={cn('space-y-4', className)}
        noValidate
        aria-live="polite"
        {...props}
      >
        {children}
        {isSubmitting && (
          <div className="sr-only" aria-live="polite">
            Form gönderiliyor...
          </div>
        )}
      </form>
    );
  }
);

AccessibleForm.displayName = 'AccessibleForm';

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({
    label,
    error,
    required = false,
    description,
    children,
    className
  }, ref) => {
    const fieldId = `field-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${fieldId}-error`;
    const descriptionId = `${fieldId}-description`;

    return (
      <div ref={ref} className={cn('space-y-2', className)}>
        <label
          htmlFor={fieldId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="zorunlu alan">
              *
            </span>
          )}
        </label>
        
        {description && (
          <p id={descriptionId} className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
        
        <div className="relative">
          {children}
          {error && (
            <p
              id={errorId}
              className="mt-1 text-sm text-red-600 dark:text-red-400"
              role="alert"
              aria-live="polite"
            >
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export const AccessibleInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { error?: string }>(
  ({ error, className, ...props }, ref) => {
    const fieldId = `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${fieldId}-error`;

    return (
      <input
        ref={ref}
        id={fieldId}
        className={cn(
          'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
    );
  }
);

AccessibleInput.displayName = 'AccessibleInput';

export const AccessibleTextarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }>(
  ({ error, className, ...props }, ref) => {
    const fieldId = `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${fieldId}-error`;

    return (
      <textarea
        ref={ref}
        id={fieldId}
        className={cn(
          'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
    );
  }
);

AccessibleTextarea.displayName = 'AccessibleTextarea';
