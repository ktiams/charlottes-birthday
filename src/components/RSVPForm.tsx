import { FormEvent, useState } from "react";
import { Mail, Phone, UserRound, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { saveRsvp, type AttendanceStatus } from "../lib/rsvp";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

interface FormState {
  name: string;
  phone: string;
  email: string;
  guestCount: string;
  attendance: AttendanceStatus | "";
}

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  guestCount: "",
  attendance: "",
};

export default function RSVPForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) nextErrors.name = "Full name is required.";
    if (!form.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (!form.attendance) nextErrors.attendance = "Please choose an attendance status.";
    if (form.attendance === "attending" && (!form.guestCount || Number(form.guestCount) < 1)) {
      nextErrors.guestCount = "Number of guests is required if attending.";
    }
    return nextErrors;
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    saveRsvp({
      id: crypto.randomUUID(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      guestCount: form.attendance === "attending" ? Number(form.guestCount) : 0,
      attendance: form.attendance as AttendanceStatus,
      createdAt: new Date().toISOString(),
    });

    setForm(initialState);
    navigate("/confirmation", {
      state: {
        name: form.name.trim(),
        attendance: form.attendance,
      },
    });
  };

  return (
    <section id="rsvp" className="bg-blush/25">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="section-kicker">Save your spot</p>
          <h2>RSVP for Charlotte's first birthday</h2>
          <p className="mt-5 leading-8 text-cocoa/75">
            Let the family know who is coming so every tiny detail, from lunch to cake time, feels
            easy and full of joy.
          </p>
          <div className="mt-8 rounded-3xl bg-white/55 p-5 text-sm leading-7 text-cocoa/75 shadow-soft">
            Saturday, August 29, 2026
            <br />
            12:00 PM - 6:00 PM
            <br />
            Philippe Park, Shelter 7
          </div>
        </div>
        <Card className="liquid-glass p-5 sm:p-7">
          <form onSubmit={submit} className="space-y-5" noValidate>
            <Field label="Full Name" error={errors.name} icon={<UserRound className="h-4 w-4" />}>
              <Input value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Phone Number" error={errors.phone} icon={<Phone className="h-4 w-4" />}>
                <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" />
              </Field>
              <Field label="Email" error={errors.email} icon={<Mail className="h-4 w-4" />}>
                <Input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" autoComplete="email" />
              </Field>
            </div>
            <Field label="Number of Guests" error={errors.guestCount} icon={<UsersRound className="h-4 w-4" />}>
              <Input
                value={form.guestCount}
                onChange={(e) => update("guestCount", e.target.value)}
                type="number"
                min="1"
                inputMode="numeric"
              />
            </Field>
            <div>
              <span className="mb-2 block text-sm font-medium text-cocoa">Attendance Status</span>
              <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Attendance Status">
                <RadioCard
                  checked={form.attendance === "attending"}
                  onClick={() => update("attendance", "attending")}
                  label="Will Attend"
                />
                <RadioCard
                  checked={form.attendance === "not_attending"}
                  onClick={() => update("attendance", "not_attending")}
                  label="Will Not Attend"
                />
              </div>
              {errors.attendance && <p className="mt-2 text-sm text-[#9f3f4d]">{errors.attendance}</p>}
            </div>
            <Button type="submit" size="lg" className="w-full">
              Submit RSVP
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  icon,
  children,
}: {
  label: string;
  error?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-medium text-cocoa">
        {icon}
        {label}
      </span>
      {children}
      {error && <span className="mt-2 block text-sm text-[#9f3f4d]">{error}</span>}
    </label>
  );
}

function RadioCard({ checked, onClick, label }: { checked: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl px-4 py-4 text-left font-medium transition ${
        checked ? "bg-cocoa text-cream shadow-soft" : "bg-white/65 text-cocoa hover:bg-white"
      }`}
      role="radio"
      aria-checked={checked}
    >
      {label}
    </button>
  );
}
