import { Link } from "react-router-dom";
export function PrivacyNotice() {
  return (
    <p className="muted text-sm">
      Al enviar aceptas nuestro{" "}
      <Link className="text-cyan-300 underline" to="/aviso-de-privacidad">
        Aviso de privacidad
      </Link>
      .
    </p>
  );
}
export function PrivacyCheck({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="consent">
      <input
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>
        Acepto el{" "}
        <Link to="/aviso-de-privacidad" className="text-cyan-300 underline">
          Aviso de privacidad
        </Link>
        .
      </span>
    </label>
  );
}
