import React from 'react';
import type { ComponentConfig } from '@measured/puck';

type FormField = {
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'radio' | 'checkbox' | 'textarea' | 'select';
  options?: { label: string; value: string }[]; // Updated type for options
};

type FormProps = {
  fields: FormField[];
};

const fieldTypes = [
  { label: 'Text Input', value: 'text' },
  { label: 'Email Input', value: 'email' },
  { label: 'Password Input', value: 'password' },
  { label: 'Number Input', value: 'number' },
  { label: 'Radio Buttons', value: 'radio' },
  { label: 'Checkbox', value: 'checkbox' },
  { label: 'Textarea', value: 'textarea' },
  { label: 'Select Dropdown', value: 'select' }
];

export const Form: React.FC<FormProps> = ({ fields }) => {
  return (
    <form className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      {fields.map((field, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder={field.label}
            />
          ) : field.type === 'select' ? (
            <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Select an option</option>
              {field.options?.map((option, i) => (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === 'radio' ? (
            <div className="space-y-2">
              {field.options?.map((option, i) => (
                <div key={i} className="flex items-center">
                  <input
                    type="radio"
                    name={`${field.label}-${index}`}
                    value={option.value}
                    className="mr-2"
                  />
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          ) : field.type === 'checkbox' ? (
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
              />
              <span>{field.label}</span>
            </div>
          ) : (
            <input
              type={field.type}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder={field.label}
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export const formConfig: ComponentConfig<FormProps> = {
  name: 'Form',
  fields: {
    fields: {
      type: 'array',
      label: 'Form Fields',
      itemLabel: (item: FormField) => `${item.label} (${fieldTypes.find(t => t.value === item.type)?.label || item.type})`,
      defaultItemProps: {
        label: 'New Field',
        type: 'text'
      },
      arrayFields: {
        label: { 
          type: 'text',
          label: 'Field Label'
        },
        type: {
          type: 'select',
          label: 'Field Type',
          options: fieldTypes
        },
        options: {
          type: 'array',
          label: 'Options',
          showIf: (data: FormField) => ['radio', 'select'].includes(data.type),
          itemLabel: (item: { label: string; value: string }) => item.label,
          defaultItemProps: {
            label: 'New Option',
            value: 'new-option'
          },
          arrayFields: {
            label: { 
              type: 'text',
              label: 'Option Label'
            },
            value: {
              type: 'text',
              label: 'Option Value'
            }
          }
        }
      }
    }
  },
  defaultProps: {
    fields: []
  }
};