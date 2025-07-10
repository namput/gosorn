import { useState, FormEvent, ChangeEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ShortLinkPage(): JSX.Element {
  const [url, setUrl] = useState<string>('');
  const [shortCode, setShortCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!url) {
      setError('กรุณาใส่ลิงก์ก่อนครับ');
      return;
    }

    setLoading(true);
    setError('');
    setShortCode('');

    try {
      const res = await fetch('http://localhost:3000/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        throw new Error('เกิดข้อผิดพลาดในการสร้างลิงก์');
      }

      const data: { code: string } = await res.json();
      setShortCode(data.code);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('เกิดข้อผิดพลาดไม่ทราบสาเหตุ');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-8">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">สร้างลิงค์สั้น</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="url"
            placeholder="วางลิงก์ที่นี่ เช่น https://gusorn.com"
            value={url}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'กำลังสร้าง...' : 'สร้างลิงค์สั้น'}
          </Button>
        </form>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {shortCode && (
          <div className="mt-4">
            <p className="font-medium">✅ ลิงค์สั้นของคุณ:</p>
            <a
              href={`https://กูสอน.ไทย/${shortCode}`}
              target="_blank"
              className="text-blue-600 underline"
              rel="noopener noreferrer"
            >
              กูสอน.ไทย/{shortCode}
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
