
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
  isGenerating?: boolean;
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
  isGenerating = false,
  className = ''
}: FormFieldProps) => {
  const InputComponent = isTextarea ? Textarea : Input;
  
  return (
    <div className={className}>
      <Label htmlFor={id} className="flex justify-between items-center mb-1">
        <span>{label}</span>
        {onGenerate && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onGenerate}
            disabled={isGenerating}
            className="h-8 gap-1 px-3 text-sm bg-slate-50 hover:bg-slate-100 border border-slate-200"
          >
            <Sparkle className="h-4 w-4" />
            {isGenerating ? 'Generating...' : 'Enhance with AI'}
          </Button>
        )}
      </Label>
      <div className="relative">
        {icon && <div className="absolute left-2 top-3 text-gray-500">{icon}</div>}
        <InputComponent
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${icon ? 'pl-8' : ''} pr-10`}
          rows={isTextarea ? 3 : undefined}
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={onCopy}
          className="absolute right-2 top-2 h-6 w-6 p-0.5 text-gray-500 hover:text-gray-700 hover:bg-transparent"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FormField;
