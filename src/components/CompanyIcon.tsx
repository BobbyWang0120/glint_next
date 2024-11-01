/**
 * 公司图标组件
 */
export default function CompanyIcon({ company }: { company: string }) {
  const icons = {
    Google: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-12 h-12">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
      </svg>
    ),
    Microsoft: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-12 h-12">
        <path fill="#ff5722" d="M6 6H22V22H6z"/>
        <path fill="#4caf50" d="M26 6H42V22H26z"/>
        <path fill="#ffc107" d="M6 26H22V42H6z"/>
        <path fill="#03a9f4" d="M26 26H42V42H26z"/>
      </svg>
    ),
    Apple: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-12 h-12">
        <path fill="#999999" d="M32.163,27.167c-0.049-4.875,3.968-7.215,4.148-7.333c-2.257-3.298-5.775-3.749-7.029-3.8	c-2.994-0.303-5.844,1.765-7.365,1.765c-1.519,0-3.868-1.72-6.355-1.675c-3.271,0.048-6.283,1.902-7.971,4.827	c-3.395,5.894-0.869,14.624,2.442,19.401c1.618,2.338,3.547,4.969,6.084,4.873c2.438-0.097,3.361-1.577,6.309-1.577	c2.949,0,3.777,1.577,6.359,1.528c2.625-0.048,4.291-2.387,5.897-4.732c1.858-2.717,2.623-5.346,2.668-5.482	C37.307,34.755,32.216,32.903,32.163,27.167"/>
        <path fill="#999999" d="M27.736,15.321c1.344-1.629,2.25-3.891,2.004-6.144c-1.937,0.079-4.283,1.289-5.672,2.917	c-1.246,1.442-2.336,3.744-2.043,5.956C24.194,18.196,26.392,16.951,27.736,15.321"/>
      </svg>
    )
  };

  return icons[company as keyof typeof icons] || null;
}
