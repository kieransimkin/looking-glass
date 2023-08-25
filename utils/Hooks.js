import { useState, useEffect } from 'react';

function getWindowDimensions() {
  if (typeof window === 'undefined') return { width: 1445, height: 600};
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
const hTags = ["h1", "h2", "h3", "h4", "h5", "h6"];
function getHeaders(selector) {
  const elements = document.querySelectorAll(selector);
  const headers = [];

  elements.forEach(el => {
    const text = el.innerText;
    if (el.getAttribute("id")=="title-heading") return;
    const id = text
      .toLowerCase()
      .split(" ")
      .join("-");

    el.setAttribute("id", id);

    headers.push({
      id,
      text,
      level: hTags.indexOf(el.tagName.toLowerCase())
    });
  });

  return headers;
}
export const useHeadingsData = (tags) => {
  const [headingElements, setHeadingElements] = useState([]);
  if (!tags) { 
    tags = hTags;
  }
  useEffect(() => {
    const newHeadingElements = getHeaders(tags);
    
    setHeadingElements(newHeadingElements);
  }, []);

  return { headingElements };
};
