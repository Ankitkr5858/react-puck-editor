import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import { Form, formConfig } from './components/Form';

type EditorProps = {
  initialData: any;
  onPublish: (data: any) => void;
};

const config = {
  categories: {
    layout: {
      label: "Layout",
      components: ["Grid", "Flex", "Space"]
    },
    typography: {
      label: "Typography",
      components: ["Heading", "Text"]
    },
    actions: {
      label: "Actions",
      components: ["Button"]
    },
    content: {
      label: "Content",
      components: ["Card", "Hero", "Logos", "Stats"]
    },
    forms: {
      label: "Forms",
      components: ["Form"]
    }
  },
  components: {
    Grid: {
      fields: {
        columns: {
          type: "number",
          label: "Number of columns",
          defaultValue: 3,
          min: 1,
          max: 12
        },
        gap: {
          type: "number",
          label: "Gap",
          defaultValue: 4,
          min: 0,
          max: 24
        },
        layout: {
          type: "fields",
          label: "Layout",
          fields: {
            verticalPadding: {
              type: "number",
              label: "Vertical Padding",
              defaultValue: 4,
              min: 0,
              max: 24
            },
            horizontalPadding: {
              type: "number",
              label: "Horizontal Padding",
              defaultValue: 4,
              min: 0,
              max: 24
            }
          }
        }
      },
      defaultProps: {
        columns: 3,
        gap: 4,
        layout: {
          verticalPadding: 4,
          horizontalPadding: 4
        }
      },
      render: ({ columns, gap, layout, children }) => (
        <div className={`grid grid-cols-${columns} gap-${gap} py-${layout.verticalPadding} px-${layout.horizontalPadding}`}>
          {children}
        </div>
      )
    },
    Flex: {
      fields: {
        direction: {
          type: "select",
          options: [
            { label: "Row", value: "row" },
            { label: "Column", value: "col" }
          ]
        },
        gap: {
          type: "number",
          label: "Gap",
          defaultValue: 4,
          min: 0,
          max: 24
        },
        align: {
          type: "select",
          options: [
            { label: "Start", value: "start" },
            { label: "Center", value: "center" },
            { label: "End", value: "end" }
          ]
        }
      },
      defaultProps: {
        direction: "row",
        gap: 4,
        align: "start"
      },
      render: ({ direction, gap, align, children }) => (
        <div className={`flex flex-${direction} gap-${gap} items-${align}`}>
          {children}
        </div>
      )
    },
    Space: {
      fields: {
        size: {
          type: "number",
          label: "Size",
          defaultValue: 4,
          min: 0,
          max: 24
        }
      },
      defaultProps: {
        size: 4
      },
      render: ({ size }) => <div className={`h-${size}`} />
    },
    Heading: {
      fields: {
        text: { type: "text" },
        size: {
          type: "select",
          options: [
            { label: "H1", value: "h1" },
            { label: "H2", value: "h2" },
            { label: "H3", value: "h3" }
          ]
        }
      },
      defaultProps: {
        text: "Heading",
        size: "h1"
      },
      render: ({ text, size }) => {
        const className = size === "h1" 
          ? "text-4xl font-bold mb-4" 
          : size === "h2"
          ? "text-3xl font-bold mb-3"
          : "text-2xl font-bold mb-2";
        return <h1 className={className}>{text}</h1>;
      }
    },
    Text: {
      fields: {
        text: { type: "text" },
        size: {
          type: "select",
          options: [
            { label: "Small", value: "sm" },
            { label: "Normal", value: "base" },
            { label: "Large", value: "lg" }
          ]
        }
      },
      defaultProps: {
        text: "Text block",
        size: "base"
      },
      render: ({ text, size }) => (
        <p className={`text-${size} mb-4`}>{text}</p>
      )
    },
    Button: {
      fields: {
        text: { type: "text" },
        variant: {
          type: "select",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" }
          ]
        },
        size: {
          type: "select",
          options: [
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" }
          ]
        }
      },
      defaultProps: {
        text: "Click me",
        variant: "primary",
        size: "md"
      },
      render: ({ text, variant, size }) => {
        const baseClass = "rounded font-semibold transition-colors";
        const sizeClass = size === "sm" 
          ? "px-3 py-1.5 text-sm" 
          : size === "md"
          ? "px-4 py-2"
          : "px-6 py-3 text-lg";
        const variantClass = variant === "primary"
          ? "bg-blue-500 hover:bg-blue-600 text-white"
          : "bg-gray-200 hover:bg-gray-300 text-gray-800";
        
        return (
          <button className={`${baseClass} ${sizeClass} ${variantClass}`}>
            {text}
          </button>
        );
      }
    },
    Card: {
      fields: {
        title: { type: "text" },
        description: { type: "text" },
        image: { type: "text" }
      },
      defaultProps: {
        title: "Card Title",
        description: "Card description goes here",
        image: "https://images.unsplash.com/photo-1706721554478-d2a7b75e10e3"
      },
      render: ({ title, description, image }) => (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      )
    },
    Hero: {
      fields: {
        title: { type: "text" },
        subtitle: { type: "text" },
        image: { type: "text" }
      },
      defaultProps: {
        title: "Welcome to our site",
        subtitle: "Discover amazing features and possibilities",
        image: "https://images.unsplash.com/photo-1706721554478-d2a7b75e10e3"
      },
      render: ({ title, subtitle, image }) => (
        <div className="relative h-[500px]">
          <img 
            src={image} 
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-5xl font-bold mb-4">{title}</h1>
            <p className="text-xl max-w-2xl">{subtitle}</p>
          </div>
        </div>
      )
    },
    Logos: {
      fields: {
        logos: {
          type: "array",
          itemLabel: "Logo",
          defaultItemProps: {
            url: "https://example.com/logo.png",
            alt: "Company Logo"
          },
          arrayFields: {
            url: { type: "text", label: "Logo URL" },
            alt: { type: "text", label: "Alt Text" }
          }
        }
      },
      defaultProps: {
        logos: [
          { url: "https://via.placeholder.com/150", alt: "Logo 1" },
          { url: "https://via.placeholder.com/150", alt: "Logo 2" },
          { url: "https://via.placeholder.com/150", alt: "Logo 3" }
        ]
      },
      render: ({ logos }) => (
        <div className="flex flex-wrap justify-center gap-8 py-8">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.url}
              alt={logo.alt}
              className="h-12 object-contain grayscale hover:grayscale-0 transition-all"
            />
          ))}
        </div>
      )
    },
    Stats: {
      fields: {
        stats: {
          type: "array",
          itemLabel: "Statistic",
          defaultItemProps: {
            value: "100+",
            label: "Customers"
          },
          arrayFields: {
            value: { type: "text", label: "Value" },
            label: { type: "text", label: "Label" }
          }
        }
      },
      defaultProps: {
        stats: [
          { value: "100+", label: "Customers" },
          { value: "50K+", label: "Downloads" },
          { value: "99.9%", label: "Uptime" }
        ]
      },
      render: ({ stats }) => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      )
    },
    Form: {
      ...formConfig,
      render: Form
    }
  }
};

export function Editor({ initialData, onPublish }: EditorProps) {
  return (
    <Puck 
      config={config} 
      data={initialData} 
      onPublish={onPublish}
    />
  );
}