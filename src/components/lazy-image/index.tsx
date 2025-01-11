import { useState, useEffect } from 'react';

/**
 * LazyImage component.
 *
 * @param {Object} props - Component props
 * @param {React.ReactElement} props.placeholder - The placeholder element
 * @param {string} props.src - The image URL
 * @param {string} props.alt - The alt text for the image
 * @param {Object} props.rest - Additional props for the image element
 * @returns {React.ReactElement} The LazyImage component
 */
const LazyImage: React.FC<{
  placeholder: React.ReactElement;
  src: string;
  alt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}> = ({ placeholder, src, alt, ...rest }): React.ReactElement => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imageToLoad = new Image();
    imageToLoad.src = src;

    imageToLoad.onload = () => {
      setLoading(false);
    };
  }, [src]);

  return (
    <>
      {loading ? placeholder : <img src={src} alt={alt} {...rest} />}
    </>
  );
};

export default LazyImage;
