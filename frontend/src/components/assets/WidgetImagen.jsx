import { useEffect } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

const widgetImagen = (publicId, width = 100, height = 100) => {
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dqhsgokht'
        }
    });
    const imagen = cld.image(publicId || 'default_profile');
    imagen
        .resize(
        auto().width(width).height(height).gravity(autoGravity())
    );  
    return <AdvancedImage cldImg={imagen} />;
};

export default widgetImagen;