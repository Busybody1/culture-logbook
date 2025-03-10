
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Sparkle } from 'lucide-react';

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  isTextarea?: boolean;
  icon?: React.ReactNode;
  onCopy: () => void;
  onGenerate?: () => void;
  className?: string;
}

const FormField = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  isTextarea = false,
  icon,
  onCopy,
  onGenerate,
  className = ''
}: FormFieldProps) => {
  const InputComponent = isTextarea ? Textarea : Input;
  
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {icon && <div className="absolute left-2 top-3 text-gray-500">{icon}</div>}
        <InputComponent
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${icon ? 'pl-8' : ''} pr-20`}
          rows={isTextarea ? 3 : undefined}
        />
        <div className="absolute right-2 top-2.5 flex gap-1">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={onCopy}
          >
            <Copy className="h-4 w-4" />
          </Button>
          {onGenerate && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={onGenerate}
            >
              <Sparkle className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormField;
