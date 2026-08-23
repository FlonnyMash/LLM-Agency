"use client";

import { useState, type FormEvent, type ChangeEvent, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { ArrowLink } from "@/components/ui/ArrowLink";

type FormState = {
  name: string;
  email: string;
  budget: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = { name: "", email: "", budget: "", message: "" };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  if (!values.email.trim()) {
    errors.email = "Please share an email address.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "That email address doesn't look right.";
  }
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = "Give us a few sentences about the project.";
  }
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: keyof FormState) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = encodeURIComponent(`New project inquiry from ${values.name}`);
    const body = encodeURIComponent(
      `${values.message}\n\nBudget: ${values.budget || "Not specified"}\nFrom: ${values.name} (${values.email})`,
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-paper-raised p-8"
      >
        <CheckCircle2 className="size-8 text-accent" aria-hidden="true" />
        <h3 className="font-display text-2xl font-medium tracking-tight text-ink">
          Thanks — we&apos;ll be in touch.
        </h3>
        <p className="text-sm leading-relaxed text-muted">
          Your email client should have opened with a pre-filled message. If
          it didn&apos;t, write to us directly at{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-accent underline">
            {siteConfig.email}
          </a>
          .
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          value={values.name}
          onChange={handleChange("name")}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          error={errors.email}
          autoComplete="email"
        />
      </div>

      <Field
        id="budget"
        label="Approximate budget (optional)"
        value={values.budget}
        onChange={handleChange("budget")}
      />

      <Field
        id="message"
        label="Tell us about the project"
        as="textarea"
        rows={5}
        value={values.message}
        onChange={handleChange("message")}
        error={errors.message}
      />

      <ArrowLink type="submit" className="mt-2 w-full sm:w-fit">
        Send message
      </ArrowLink>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  as = "input",
  ...props
}: {
  id: keyof FormState;
  label: string;
  error?: string;
  as?: "input" | "textarea";
} & Omit<InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>, "id">) {
  const inputClasses = `w-full rounded-xl border bg-transparent px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink ${
    error ? "border-accent" : "border-line-strong"
  }`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-label text-xs uppercase tracking-[0.16em] text-ink-soft">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          className={inputClasses}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          name={id}
          className={inputClasses}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-accent"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
