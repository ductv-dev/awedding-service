import type React from 'react';
import type { WeddingConfig } from '@workspace/types';
import { cn } from '../lib/cn';

interface WeddingFamilyGridProps {
  groom: WeddingConfig['groom'];
  bride: WeddingConfig['bride'];
  fontDisplay?: string;
  className?: string;
  cardClassName?: string;
}

const wrapText: React.CSSProperties = {
  overflowWrap: 'anywhere',
  wordBreak: 'break-word',
  hyphens: 'auto',
};

function FamilyCard({
  person,
  familyTitle,
  coupleTitle,
  fontDisplay,
  className,
}: {
  person: WeddingConfig['groom'] | WeddingConfig['bride'];
  familyTitle: string;
  coupleTitle: string;
  fontDisplay?: string;
  className?: string;
}) {
  return (
    <div
      className={cn('min-w-0 px-1 py-2 text-center sm:px-4', className)}
    >
      <div
        className="mb-3 text-[10px] font-bold uppercase"
        style={{
          color: 'var(--primary)',
          letterSpacing: '0.16em',
        }}
      >
        {familyTitle}
      </div>

      <div className="mb-3 space-y-1">
        <p className="text-xs font-medium leading-snug sm:text-sm" style={{ ...wrapText, color: 'var(--text)' }}>
          {person.fatherName}
        </p>
        <p className="text-xs font-medium leading-snug sm:text-sm" style={{ ...wrapText, color: 'var(--text)' }}>
          {person.motherName}
        </p>
      </div>

      <p className="mb-3 text-[11px] leading-snug sm:text-sm" style={{ ...wrapText, color: 'var(--text-muted)' }}>
        {person.address}
      </p>

      <div
        className="px-1 py-1 sm:px-2"
      >
        <p className="mb-1 text-[9px] uppercase sm:text-[10px]" style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
          {coupleTitle}
        </p>
        <p
          className="text-lg font-bold leading-tight sm:text-xl"
          style={{ ...wrapText, fontFamily: fontDisplay, color: 'var(--accent)' }}
        >
          {person.name}
        </p>
        <p className="mt-0.5 text-[11px] sm:text-xs" style={{ ...wrapText, color: 'var(--text-muted)' }}>
          {person.role}
        </p>
      </div>
    </div>
  );
}

export function WeddingFamilyGrid({
  groom,
  bride,
  fontDisplay,
  className,
  cardClassName,
}: WeddingFamilyGridProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-5 sm:gap-10', className)}>
      <FamilyCard
        person={groom}
        familyTitle="Nhà Trai"
        coupleTitle="Chú Rể"
        fontDisplay={fontDisplay}
        className={cardClassName}
      />
      <FamilyCard
        person={bride}
        familyTitle="Nhà Gái"
        coupleTitle="Cô Dâu"
        fontDisplay={fontDisplay}
        className={cardClassName}
      />
    </div>
  );
}
