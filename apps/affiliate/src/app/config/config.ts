// export const apiBaseUrl: string = import.meta.env.VITE_PUBLIC_API_BASE_URL ?? 'http://localhost:5100';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const apiBaseUrl: string = process.env.VITE_PUBLIC_API_BASE_URL ?? 'http://localhost:5201';

if (!apiBaseUrl) throw new Error(`No SNOWPACK_PUBLIC_API_BASE_URL, can't build`);

export const config = {
  apiBaseURL: apiBaseUrl,
};
