import { useEffect } from 'react';

const useScript = url => {
  useEffect(() => {
    
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
        console.log('useScript')
    //   document.body.removeChild(script);
    }
  }, [url]);
};

export default useScript;