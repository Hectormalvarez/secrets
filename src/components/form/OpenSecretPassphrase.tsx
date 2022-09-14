import React, {forwardRef} from "react"

const OpenSecretPassphrase = forwardRef(
    ({ isPassphraseProtected, error }: any, ref: any) => {
      if (!isPassphraseProtected || error) return <></>;
      return (
        <div className="mx-auto mb-8 flex w-full flex-col items-start justify-center">
          <label
            className="mb-2 text-sm font-bold tracking-tighter md:text-xl md:tracking-wider"
            htmlFor="passphrase"
          >
            (optional: require passphrase to open secret)
          </label>
          <input
            className="w-full rounded-md p-4 "
            type="password"
            name="passphrase"
            placeholder="Enter a passphrase here"
            id="passphrase"
            ref={ref}
          />
        </div>
      );
    }
  );

  export default OpenSecretPassphrase