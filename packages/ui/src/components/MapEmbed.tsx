interface MapEmbedProps {
  url: string;
  address?: string;
  className?: string;
}

export function MapEmbed({ url, address, className = '' }: MapEmbedProps) {
  return (
    <div className={`overflow-hidden rounded-lg border border-current/15 ${className}`}>
      <iframe
        src={url}
        width="100%"
        height="180"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={address ? `Bản đồ: ${address}` : 'Bản đồ địa điểm'}
        aria-label={address ? `Bản đồ đến ${address}` : 'Bản đồ'}
      />
      {address && (
        <a
          href={`https://maps.google.com/maps?q=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-3 py-2 text-xs hover:opacity-80"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {address}
        </a>
      )}
    </div>
  );
}
