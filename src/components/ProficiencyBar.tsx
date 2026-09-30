/** A labeled 1-5 proficiency bar (ST-042). */
export function ProficiencyBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-foreground">{label}</span>
        <span className="text-muted-foreground">{value}/5</span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={5}
        className="h-1 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
    </div>
  )
}
