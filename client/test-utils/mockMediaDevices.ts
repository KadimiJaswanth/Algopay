export function mockGetUserMedia() {
  const original = navigator.mediaDevices?.getUserMedia;
  const fakeStream = {
    getTracks: () => [{ stop: () => {} }],
  } as unknown as MediaStream;
  // @ts-ignore
  navigator.mediaDevices = navigator.mediaDevices || {};
  // @ts-ignore
  navigator.mediaDevices.getUserMedia = async () => fakeStream;
  return () => {
    if (original) navigator.mediaDevices.getUserMedia = original;
  };
}

export function mockEnumerateDevices(devices = [{ deviceId: 'cam-1', kind: 'videoinput', label: 'Mock Cam' }]) {
  const original = navigator.mediaDevices?.enumerateDevices;
  // @ts-ignore
  navigator.mediaDevices = navigator.mediaDevices || {};
  // @ts-ignore
  navigator.mediaDevices.enumerateDevices = async () => devices as any;
  return () => {
    if (original) navigator.mediaDevices.enumerateDevices = original;
  };
}

export function mockBarcodeDetector(returnValue?: string) {
  // Provide a global BarcodeDetector mock
  const original = (window as any).BarcodeDetector;
  class MockDetector {
    formats: string[];
    constructor(opts: any) { this.formats = opts?.formats || []; }
    async detect(_video: any) {
      if (returnValue) {
        return [{ rawValue: returnValue }];
      }
      return [];
    }
  }
  (window as any).BarcodeDetector = MockDetector;
  return () => { (window as any).BarcodeDetector = original; };
}
