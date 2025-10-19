import { useEffect, useState } from 'react';

export type CameraState = 'unsupported' | 'not-granted' | 'granted' | 'unknown';

export default function useCamera() {
  const [state, setState] = useState<CameraState>('unknown');

  useEffect(() => {
    if (!navigator || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setState('unsupported');
      return;
    }

    let mounted = true;

    (async () => {
      try {
        // try query permission (may not be supported on all browsers)
        // @ts-ignore navigator.permissions may be undefined
        const perm = (navigator as any).permissions?.query?.({ name: 'camera' });
        if (perm && typeof perm.then === 'function') {
          const p = await perm;
          if (!mounted) return;
          if (p.state === 'granted') setState('granted');
          else if (p.state === 'denied') setState('not-granted');
          else setState('unknown');
        } else {
          // fallback: optimistic
          setState('unknown');
        }
      } catch (e) {
        setState('unknown');
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return state;
}
