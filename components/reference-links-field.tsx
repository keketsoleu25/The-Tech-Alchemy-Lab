"use client";

type ReferenceLinksFieldProps = {
  links: string[];
  onChange: (links: string[]) => void;
  disabled?: boolean;
  title?: string;
  description?: string;
};

const MAX_LINKS = 10;

export function ReferenceLinksField({
  links,
  onChange,
  disabled = false,
  title = "Reference links",
  description = "Share websites, cloud folders, social pages or examples that provide useful context.",
}: ReferenceLinksFieldProps) {
  function update(index: number, value: string) {
    onChange(links.map((link, linkIndex) => linkIndex === index ? value : link));
  }

  return (
    <section className="reference-links-field">
      <div className="attachment-heading">
        <div><h3>{title}</h3><p>{description}</p></div>
        <span>{links.filter((link) => link.trim()).length}/{MAX_LINKS}</span>
      </div>
      <div className="reference-link-list">
        {links.map((link, index) => <div key={index}>
          <label>
            <span className="sr-only">Reference link {index + 1}</span>
            <input
              type="url"
              inputMode="url"
              placeholder="https://"
              maxLength={500}
              value={link}
              disabled={disabled}
              onChange={(event) => update(index, event.target.value)}
            />
          </label>
          <button type="button" disabled={disabled} onClick={() => onChange(links.filter((_, linkIndex) => linkIndex !== index))} aria-label={`Remove reference link ${index + 1}`}>Remove</button>
        </div>)}
      </div>
      {links.length < MAX_LINKS ? <button type="button" className="reference-add" disabled={disabled} onClick={() => onChange([...links, ""])}>＋ Add another link</button> : null}
    </section>
  );
}
