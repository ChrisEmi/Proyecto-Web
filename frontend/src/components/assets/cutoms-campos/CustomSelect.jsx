import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomSelect = ({ value, onChange, options, placeholder = "Seleccionar...", color = "escom-400", disabled = false, defaultValue }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);
    const [selectedValue, setSelectedValue] = useState(defaultValue || value);

    const colorClasses = {
        'escom-300': {
            border: 'border-escom-300',
            hoverBorder: 'hover:border-escom-300',
            text: 'text-escom-300',
            bg: 'bg-escom-300'
        },
        'escom-400': {
            border: 'border-escom-400',
            hoverBorder: 'hover:border-escom-400',
            text: 'text-escom-400',
            bg: 'bg-escom-400'
        },
        'escom-sombra-500': {
            border: 'border-escom-sombra-500',
            hoverBorder: 'hover:border-escom-sombra-500',
            text: 'text-escom-sombra-500',
            bg: 'bg-escom-sombra-500'
        },
        'escom-900': {
            border: 'border-escom-900',
            hoverBorder: 'hover:border-escom-900',
            text: 'text-escom-900',
            bg: 'bg-escom-900'
        }
    };

    const currentColor = colorClasses[color];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const handleSelect = (optionValue) => {
        setSelectedValue(optionValue);
        onChange(optionValue);
        setIsOpen(false);
    };

    const currentValue = value !== undefined ? value : selectedValue;
    const selectedOption = options.find(opt => opt.value === currentValue);

    return (
        <div ref={selectRef} className="relative">
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`relative appearance-none bg-white text-sm pl-4 pr-20 py-2 rounded-xl font-semibold transition-all w-full text-left flex items-center justify-between ${
                    disabled 
                        ? 'border-escom-200 bg-escom-50 text-escom-sombra-400 cursor-not-allowed' 
                        : `text-escom-sombra-600 hover:shadow-xl cursor-pointer border-transparent ${currentColor.hoverBorder}`
                }`}
            >
                <span className="flex items-center gap-2">
                    {selectedOption?.label || placeholder}
                    {selectedOption?.icon && (
                        <FontAwesomeIcon icon={['fas', selectedOption.icon]} className="text-sm" />
                    )}
                </span>
                <FontAwesomeIcon 
                    icon={['fas', 'chevron-down']} 
                    className={`${currentColor.text} text-sm absolute right-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            {isOpen && (
                <div className={`absolute z-50 mt-2 w-full bg-white rounded-xl shadow-2xl overflow-x-hidden`}>
                    <div className="max-h-60 overflow-y-auto">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className={`w-full text-left px-4 py-3 transition-all duration-200 font-semibold text-sm
                                    ${currentValue === option.value 
                                        ? `${currentColor.bg} text-white` 
                                        : 'text-escom-sombra-600 hover:bg-escom-50 hover:text-escom-700'
                                    }
                                    ${option.value === options[options.length - 1].value ? '' : 'border-b border-gray-100'}
                                `}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        {option.label}
                                        {option.icon && (
                                            <FontAwesomeIcon icon={['fas', option.icon]} className="text-sm" />
                                        )}
                                    </span>
                                    {currentValue === option.value && (
                                        <FontAwesomeIcon 
                                            icon={['fas', 'check']} 
                                            className="text-sm"
                                        />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
