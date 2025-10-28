"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const Schema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().min(4, "Min 4 chars").required("Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const [err, setErr] = useState("");

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transition hover:shadow-indigo-100">
        <h1 className="mb-6 text-center text-3xl font-extrabold text-indigo-600">
          Welcome Back 
        </h1>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={Schema}
          onSubmit={async (values, { setSubmitting }) => {
            setErr("");
            try {
              await login(values.username, values.password);
              router.replace("/dashboard");
            } catch (e: any) {
              setErr(e?.message || "Invalid credentials");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              {err && (
                <div className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
                  {err}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <Field
                  name="username"
                  placeholder="Enter your username"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
              >
                {isSubmitting ? "Signing in..." : "Login"}
              </button>

              <p className="text-center text-sm text-gray-600">
                No account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-indigo-600 hover:text-indigo-800"
                >
                  Sign up
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}
