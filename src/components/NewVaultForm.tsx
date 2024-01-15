"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

interface FormValues {
  vault: string;
  password: string;
}

const saveData = ({ vault, password }: FormValues) => {
  const newVault = {
    id: uuidv4(),
    vault,
    password,
  };
  sessionStorage.setItem(newVault.id, JSON.stringify(newVault));
};

const NewVaultForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    saveData(data);
    reset();
  };

  return (
    <form
      id="new-vault-form"
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full pb-8 pt-16 sm:max-w-md md:max-w-2xl"
    >
      <div className="mb-4">
        <textarea
          id="vault-text"
          placeholder="enter your vault text"
          {...register("vault", { required: true })}
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500"
          rows={10}
        />
        {errors.vault && (
          <span className="text-sm text-red-500">Cannot save empty vault!</span>
        )}
      </div>

      <div className="mb-6">
        <input
          id="password"
          placeholder="enter your password"
          {...register("password", { required: true })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.password && (
          <span className="text-sm text-red-500">Password is required!</span>
        )}
      </div>
      <div className="flex flex-col space-y-4">
        <button
          type="submit"
          className="
          w-64 transform rounded-lg border-2 border-gray-800 bg-gray-900 px-8 py-2 text-lg font-bold text-gray-200
          shadow-lg transition-transform hover:bg-gray-700 hover:text-gray-50 focus:ring-4 active:scale-75
          "
        >
          Create Vault
        </button>
        <Link href="/open-vault">
          <button
            type="button"
            className="
          w-64 transform rounded-lg border-2 border-gray-800 bg-gray-200 px-8 py-2 text-lg font-bold
          shadow-lg transition-transform hover:bg-gray-700 hover:text-gray-50 focus:ring-4 active:scale-75
          "
          >
            Open a Vault
          </button>
        </Link>
      </div>
    </form>
  );
};

export default NewVaultForm;
