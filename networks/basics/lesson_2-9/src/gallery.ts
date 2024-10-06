const urls = ['/images/1.avif', '/images/2.avif', '/images/3.avif'] as const;

const cachedImageFlags = urls.map(() => false);

(() => {
  const currentImage = document.getElementById('currentImage');
  const nextImage = document.getElementById('nextImage');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (
    !(currentImage instanceof HTMLImageElement) ||
    !(nextImage instanceof HTMLImageElement) ||
    !(prevBtn instanceof HTMLButtonElement) ||
    !(nextBtn instanceof HTMLButtonElement)
  ) {
    return null;
  }

  const getPrevImageIndex = (index: number) => {
    return (index - 1 + urls.length) % urls.length;
  };

  const getNextImageIndex = (index: number) => {
    return (index + 1) % urls.length;
  };

  const cacheImage = (imageIndex: number) => {
    const imageSrc = urls[imageIndex];

    fetch(imageSrc, {
      method: 'GET',
      cache: 'reload',
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((blob) => {
        const urlObject = URL.createObjectURL(blob);
        nextImage.src = urlObject;
        cachedImageFlags[imageIndex] = true;
      })
      .catch((error) => {
        console.log('Image fetch failed:', error);
      });
  };

  const isImageCached = (index: number) => {
    return cachedImageFlags[index];
  };

  const ensureImageCache = (index: number) => {
    if (!isImageCached(index)) {
      cacheImage(index);
    }
  };

  const cachePrevImage = (index: number) => {
    const prevImageIndex = getPrevImageIndex(index);
    ensureImageCache(prevImageIndex);
  };

  const cacheNextImage = (index: number) => {
    const nextImageIndex = getNextImageIndex(index);
    ensureImageCache(nextImageIndex);
  };

  const changeImage = (index: number) => {
    if (index < 0 && index > urls.length - 1) {
      return;
    }

    currentImage.src = urls[index];
  };

  let currentImageIndex = 0;

  prevBtn.addEventListener('click', () => {
    currentImageIndex = getPrevImageIndex(currentImageIndex);
    changeImage(currentImageIndex);
    cachePrevImage(currentImageIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentImageIndex = getNextImageIndex(currentImageIndex);
    changeImage(currentImageIndex);
    cacheNextImage(currentImageIndex);
  });

  changeImage(currentImageIndex);
  cacheNextImage(currentImageIndex);
})();
