import {useState, useEffect} from 'react';

// Avoid hydration mismatch without component flicker
// https://www.joshwcomeau.com/react/the-perils-of-rehydration/#abstractions

function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div {...delegated}>
      {children}
    </div>
  );
}

export default ClientOnly;