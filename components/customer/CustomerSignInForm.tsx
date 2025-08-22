"use client";

import { useEffect, useState } from "react";
import { useCustomer } from "./CustomerContext";

interface CustomerSignInFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
  onFormStateChange?: (isLogin: boolean) => void;
}

export default function CustomerSignInForm({
  onSuccess,
  onClose,
  onFormStateChange,
}: CustomerSignInFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, signup } = useCustomer();

  // Notify parent component when form state changes
  useEffect(() => {
    if (onFormStateChange) {
      onFormStateChange(isLogin);
    }
  }, [isLogin, onFormStateChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await login(email, password);

      if (result.success) {
        // Clear form
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");

        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        } else if (onClose) {
          onClose();
        }

        // Redirect to account page if no callbacks provided
        if (!onSuccess && !onClose) {
          window.location.href = "/account";
        }
      } else {
        setError(result.error || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signup(email, password, firstName, lastName);

      if (result.success) {
        // Successfully created account, switch to login form
        setIsLogin(true);
        setPassword("");
        setFirstName("");
        setLastName("");
        setError(""); // Clear any previous errors
      } else {
        setError(result.error || "Account creation failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during account creation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 mt-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}

      {isLogin ? (
        // Login Form
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="borderless-input w-full py-2 border-b border-gray-300 focus:border-gray-900 focus:outline-none transition-colors text-sm"
              placeholder="Email"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="borderless-input w-full py-2 border-b border-gray-300 focus:border-gray-900 focus:outline-none transition-colors text-sm"
              placeholder="Password"
              required
              disabled={isLoading}
            />
          </div>

          <div className="pt-2">
            <button
              type="button"
              className="text-sm text-gray-600 underline hover:text-gray-900 transition-colors"
              disabled={isLoading}
            >
              Forgot your password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200 rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      ) : (
        // Create Account Form
        <form onSubmit={handleCreateAccount} className="space-y-4">
          <div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="borderless-input w-full py-2 border-b border-gray-300 focus:border-gray-900 focus:outline-none transition-colors text-sm"
              placeholder="First name"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="borderless-input w-full py-2 border-b border-gray-300 focus:border-gray-900 focus:outline-none transition-colors text-sm"
              placeholder="Last name"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="borderless-input w-full py-2 border-b border-gray-300 focus:border-gray-900 focus:outline-none transition-colors text-sm"
              placeholder="Email"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="borderless-input w-full py-2 border-b border-gray-300 focus:border-gray-900 focus:outline-none transition-colors text-sm"
              placeholder="Password"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3 px-4 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200 rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>
      )}

      {/* Separator */}
      <div className="border-t border-gray-200 pt-6">
        {isLogin ? (
          <div className="text-left space-y-3">
            <p className="text-sm text-gray-900">Don't have an account?</p>
            <p className="text-sm text-gray-600">
              Let's get personal. Create an account to discover new collections,
              curated edits, and get insider access.
            </p>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              disabled={isLoading}
              className="w-full mt-1 py-3 px-4 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200 rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create account
            </button>
          </div>
        ) : (
          <div className="text-left">
            <p className="text-sm text-gray-900 mb-3">
              Already have an account?
            </p>
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              disabled={isLoading}
              className="w-full py-3 px-4 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200 rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
