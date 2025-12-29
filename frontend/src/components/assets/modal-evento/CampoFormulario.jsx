import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CampoFormulario = ({ 
    label, 
    icon, 
    colSpan = "col-span-1", 
    children, 
    extraLabelClass = "mb-2" 
}) => {
    return (
        <div className={colSpan}>
            <label className={`block text-xs md:text-sm font-semibold text-escom-900 ${extraLabelClass}`}>
                {label} <FontAwesomeIcon icon={['fas', icon]} className="text-escom-500"/>
            </label>
            {children}
        </div>
    );
};

export default CampoFormulario;
