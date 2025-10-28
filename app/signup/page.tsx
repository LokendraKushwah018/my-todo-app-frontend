"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signup } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const Schema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().min(4, "Min 4 chars").required("Password is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function SignupPage() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transition hover:shadow-indigo-100">
        <h1 className="mb-6 text-center text-3xl font-extrabold text-indigo-600">
          Create Your Account 
        </h1>

        <Formik
          initialValues={{
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
          }}
          validationSchema={Schema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setErr("");
            setMsg("");
            try {
              await signup(values);
              setMsg("✅ Account created successfully! Redirecting to login...");
              resetForm();
              setTimeout(() => router.push("/login"), 1000);
            } catch (e: any) {
              setErr(e?.message || "Signup failed. Please try again.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              {/* Success & Error messages */}
              {msg && (
                <div className="rounded-md bg-green-50 px-4 py-2 text-sm text-green-700">
                  {msg}
                </div>
              )}
              {err && (
                <div className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
                  {err}
                </div>
              )}

              {/* First / Last Name */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <Field
                    name="firstName"
                    placeholder="John"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <Field
                    name="lastName"
                    placeholder="Doe"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <Field
                  name="username"
                  placeholder="Choose a username"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
              >
                {isSubmitting ? "Creating Account..." : "Sign Up"}
              </button>

              {/* Footer link */}
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  className="font-medium text-indigo-600 hover:text-indigo-800"
                  href="/login"
                >
                  Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}
