import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import CameraScanner from '@/components/CameraScanner';
import { mockGetUserMedia, mockEnumerateDevices, mockBarcodeDetector } from '@/test-utils/mockMediaDevices';

describe('CameraScanner', () => {
  it('starts and stops camera and calls onScan when BarcodeDetector returns a value', async () => {
    const restoreGetUserMedia = mockGetUserMedia();
    const restoreEnum = mockEnumerateDevices();
    const restoreBD = mockBarcodeDetector('ALGOTESTADDRESS');

    const onScan = vi.fn();
    render(<CameraScanner onScan={onScan} />);

    // start button is present
    const startButton = await screen.findByRole('button', { name: /Start/i });
    fireEvent.click(startButton);

    // Wait a short time for interval to run (BarcodeDetector mock returns immediately)
    await new Promise((r) => setTimeout(r, 700));

    expect(onScan).toHaveBeenCalled();

    // cleanup mocks
    restoreGetUserMedia();
    restoreEnum();
    restoreBD();
  });
});
