import { NextRequest, NextResponse } from 'next/server'
import { format, formatInTimeZone } from 'date-fns-tz';

const bangkokTimeZone = 'Asia/Bangkok';

/**
 * Returns a Response object with a JSON body
 */
export function jsonResponse(status: number, data: any, init?: ResponseInit) {
  return new NextResponse(JSON.stringify(data), {
    ...init,
    status,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
    },
  })
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export const formatDateInTimeZone = (date: Date | string): string => {
  return formatInTimeZone(new Date(date), bangkokTimeZone, 'yyyy-MM-dd HH:mm:ss');
};

export const getIpAddress = (request: NextRequest): string | null => {
  let ipAddress = null;
  const ip = request.headers.get('x-forwarded-for')?.split(",").shift();
  if (ip) {
    const ips = ip.split(':');
    ipAddress = ips.length > 1 ? ips[ips.length - 1].trim() : ip.trim();

  }

  return ipAddress
}


