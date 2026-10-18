# Alchemy Poultry & Farming

**A product by The Tech Alchemy Lab**  
**Status:** MVP deployed; pilot validation and reliability testing in progress  
**Live app:** https://alchemy-poultry-farming.vercel.app/

## Product vision

Alchemy Poultry & Farming is a practical, mobile-first farm record-keeping tool for small and growing poultry operations. It is designed for farmers managing broilers, layers, or both, including farmers who need to work where internet access is unreliable.

The immediate goal is to help a farmer keep useful operational records in one place: flock counts, daily activity, egg production, feed use, mortality, treatments, income, expenses, and basic performance summaries. The product should stay simple enough for everyday use on a phone.

## MVP scope

- **Dashboard:** active bird counts, eggs recorded today, income and expenses, flock overview, and quick actions.
- **Flock management:** create flocks with type (broilers/layers), breed, bird count, start date, and starting cost; close, reopen, or delete a flock.
- **Daily records:** mortality, egg production, feed consumption, treatments/vaccinations, and notes.
- **Finances:** record income and expenses with categories, amount, date, and optional flock association.
- **Reports:** summary totals for mortality, feed, eggs, and net cash position.
- **Backup and restore:** export and import a JSON backup.
- **Offline shell:** app assets are intended to remain available through service-worker caching.

## Current technical boundaries

- Records are currently stored in the browser using localStorage.
- Data belongs to the browser/device where it was entered. It is **not** cloud-synchronised and is not automatically shared between devices or users.
- JSON export/import is the current manual backup and transfer path.
- There are no user accounts, shared farm workspaces, sensor integrations, or cloud database in the MVP.
- Offline behaviour, persistence, import/export, and the live connection indicator must be tested on actual target phones before the app is described as production-ready.

## Design principles

1. **Mobile first:** prioritize quick, legible forms and large touch targets.
2. **Works with weak connectivity:** avoid making everyday record entry depend on a live network.
3. **Farmer-friendly language:** keep workflows understandable without technical training.
4. **Useful before clever:** validate core record-keeping with real farmers before adding complex analytics or hardware.
5. **Data safety:** clearly explain local-only storage and encourage regular backups until a reliable sync strategy exists.
6. **Build for extension:** keep farm, flock, timestamp, and record relationships consistent so future cloud sync and sensor data can be added without a rewrite.

## Planned roadmap

### Phase 1 — Stabilise the MVP
- [ ] Verify the app loads correctly on mobile and desktop.
- [ ] Verify the online/offline indicator initializes correctly and updates when connectivity changes.
- [ ] Test flock creation, editing/closing, and totals.
- [ ] Test daily records and ensure dashboard/report totals agree.
- [ ] Test income/expense entries and net cash calculations.
- [ ] Test JSON export, clear-browser/reload recovery using import, and malformed backup handling.
- [ ] Test offline launch after a successful online visit.
- [ ] Add clearer empty states, validation, and confirmation before destructive actions where needed.
- [ ] Recruit a small number of pilot farmers and collect workflow feedback before expanding scope.

### Phase 2 — Reliable farm data
- [ ] Define a versioned data schema and migration approach.
- [ ] Add farm profiles and a clear path for multiple flocks per farm.
- [ ] Decide on authentication, cloud storage, permissions, and conflict handling before introducing cross-device sync.
- [ ] Add automatic or guided backup reminders and test restore procedures.
- [ ] Add data-quality checks for impossible or suspicious values without blocking legitimate farm practices.

### Phase 3 — Vision and thermal monitoring (future hardware)
These are future extensions, **not current MVP capabilities**.

**Vision readers/cameras may eventually support:**
- Bird counting estimates and flock distribution.
- Movement or crowding anomaly flags.
- Other visual observations only where camera placement, image quality, privacy, and validation support them.

**Thermal readers may eventually support:**
- Poultry-house surface-temperature readings and hot/cold zone monitoring.
- Alerts against farmer-configured thresholds.
- Time-stamped trends that can be reviewed alongside flock records.

Thermal surface readings must not be presented as equivalent to a bird's core body temperature. Neither vision nor thermal signals should be marketed as a reliable disease diagnosis without appropriate validation and expert review.

**Future integration concepts:** farms, sensors, sensor readings, alerts, and vision events; each reading/event should carry a sensor or source ID, farm/flock association where known, timestamp, units, and confidence/quality metadata where applicable. Hardware connectivity (Wi-Fi, Bluetooth, or a gateway) and storage design should be selected only after the intended devices and farm conditions are known.

## Pilot validation checklist

For each pilot farmer, observe whether they can complete these tasks without help:

- [ ] Create a broiler or layer flock.
- [ ] Record daily mortality and feed use.
- [ ] Record egg production when relevant.
- [ ] Add an income or expense.
- [ ] Find the current flock and understand the summary figures.
- [ ] Export a backup and successfully restore it.
- [ ] Explain where their data is stored and what happens if they change phones or clear browser data.

Ask pilot users which records they already keep, what takes the most time, what figures they need daily, and what they would realistically pay for. Prioritize improvements based on repeated evidence, not assumptions.

## Current release

The deployed MVP is available at https://alchemy-poultry-farming.vercel.app/. A Vercel deployment was reported as **READY**. A prior issue showed the connection status stuck at “Checking connection…”; the app was redeployed with immediate online/offline status initialization. That behaviour still needs confirmation on the target device, including a hard refresh and an InPrivate/private-browser test.

## Product ownership

Alchemy Poultry & Farming is a product of **The Tech Alchemy Lab**, a South African digital solutions business. The near-term priority is a stable, understandable pilot product and evidence from real farmers. Vision and thermal hardware should follow only after core workflows are validated.

---

*Last updated: 18 October 2026*
