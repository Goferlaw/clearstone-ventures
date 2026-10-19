import { inquiryCategories } from "./site";
export type Inquiry = {
  name: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  propertyAddress: string;
  message: string;
  website: string;
  token: string;
};
export function validateInquiry(input: unknown): {
  data?: Inquiry;
  errors: Record<string, string>;
} {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { errors: { form: "Please provide the inquiry fields." } };
  const raw = input as Record<string, unknown>;
  const fields = [
    "name",
    "email",
    "phone",
    "company",
    "category",
    "propertyAddress",
    "message",
    "website",
    "token",
  ] as const;
  const data = Object.fromEntries(
    fields.map((key) => [
      key,
      typeof raw[key] === "string" ? (raw[key] as string).trim() : "",
    ]),
  ) as Inquiry;
  const errors: Record<string, string> = {};
  if (data.name.length < 2 || data.name.length > 150)
    errors.name = "Enter your name (2–150 characters).";
  if (
    data.email.length > 254 ||
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email) ||
    /[\r\n]/.test(data.email)
  )
    errors.email = "Enter a valid email address.";
  if (data.phone.length > 50) errors.phone = "Use no more than 50 characters.";
  if (data.company.length > 200)
    errors.company = "Use no more than 200 characters.";
  if (!(inquiryCategories as readonly string[]).includes(data.category))
    errors.category = "Select an inquiry category.";
  if (data.propertyAddress.length > 300)
    errors.propertyAddress = "Use no more than 300 characters.";
  if (data.message.length < 20 || data.message.length > 5000)
    errors.message = "Tell us a little more (20–5,000 characters).";
  if (data.website) errors.form = "This submission could not be accepted.";
  if (data.token.length > 1000) errors.form = "Refresh the form and try again.";
  return { data, errors };
}
