import React, { useState, useEffect } from "react";
import { 
	Avatar
} from 'components/ui'
import { 
	MdOutlineFastfood
} from 'react-icons/md'
import { getAvatar } from "services/ApiService";

const RenderImage = ({ image }) => {
  const [productImg, setProductImg] = useState("");
  const getImage = async (filename) => {
    try {
      const profile = await getAvatar(filename);
      setProductImg(URL.createObjectURL(profile));
    } catch (error) {
      setProductImg();
    }
  };

  useEffect(() => {
    if (image) {
      getImage(image);
    }
  }, [image]);
  return (
    <div className="rounded-tl-lg rounded-tr-lg overflow-hidden ">          
      <Avatar
        className="border-2 border-white overflow-hidden"
        size={250}
        shape="square"
        icon={<MdOutlineFastfood />}
        src={productImg}
      />
    </div>
  );
};

export default RenderImage;
