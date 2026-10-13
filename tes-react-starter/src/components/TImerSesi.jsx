import { useState, useEffect } from 'react';

export default function TimerSesi() {
  const [detik, setDetik] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDetik(d => d + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const menitFormat = Math.floor(detik / 60).toString().padStart(2, '0');
  const detikFormat = (detik % 60).toString().padStart(2, '0');

  return (
    <div style={{ padding: '5px', background: '#eee', display: 'inline-block' }}>
      Sesi aktif: {menitFormat}:{detikFormat}
    </div>
  );
}