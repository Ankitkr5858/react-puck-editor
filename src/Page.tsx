import { Render } from "@measured/puck";
import "@measured/puck/puck.css";
import { Form, formConfig } from './components/Form';

const config = {
  components: {
    Grid: {
      render: ({ columns, gap, children }) => (
        <div className={`grid grid-cols-${columns} gap-${gap}`}>
          {children}
        </div>
      )
    },
    Flex: {
      render: ({ direction, gap, align, children }) => (
        <div className={`flex flex-${direction} gap-${gap} items-${align}`}>
          {children}
        </div>
      )
    },
    Space: {
      render: ({ size }) => <div className={`h-${size}`} />
    },
    Heading: {
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
      render: ({ text, size }) => (
        <p className={`text-${size} mb-4`}>{text}</p>
      )
    },
    Button: {
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

type PageProps = {
  data: any;
};

export function Page({ data }: PageProps) {
  return <Render config={config} data={data} />;
}