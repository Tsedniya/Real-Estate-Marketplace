import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle } from "lucide-react";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signin`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4">

      <Card className="w-full max-w-md shadow-xl hover:shadow-2xl transition-all duration-300 border-slate-200/60">

        {/* HEADER */}
        <CardHeader className="text-center space-y-2 pb-4">

          <CardTitle className="text-2xl font-semibold tracking-tight text-slate-900">
            Sign in
          </CardTitle>

          <CardDescription className="text-sm text-slate-500">
            Access your property dashboard
          </CardDescription>
        </CardHeader>

        {/* BODY */}
        <CardContent className="space-y-5 px-6 pb-6">

          {error && (
            <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-100 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm text-slate-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                onChange={handleChange}
                className="h-10 text-sm border-slate-200 focus-visible:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm text-slate-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                className="h-10 text-sm border-slate-200 focus-visible:ring-blue-500"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          {/* DIVIDER */}
          <div className="relative flex items-center text-xs text-slate-400">
            <div className="flex-grow border-t border-slate-200" />
            <span className="px-3">or continue with</span>
            <div className="flex-grow border-t border-slate-200" />
          </div>

          <OAuth />
        </CardContent>

        {/* FOOTER */}
        <div className="py-4 px-6 text-center border-t border-slate-100 bg-slate-50/40">
          <p className="text-sm text-slate-500">
            Don’t have an account?{" "}
            <Link
              to="/sign-up"
              className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>

      </Card>
    </div>
  );
};

export default SignIn;