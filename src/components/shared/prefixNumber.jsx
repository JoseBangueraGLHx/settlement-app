const PrefixedNumericInput = React.forwardRef(
    ({ value = "", onChange, prefixText, maxLength = 8, ...rest }, ref) => {
      const display = value ? `${prefixText}${value}` : "";
      const isValid = value.length === maxLength;
  
      const handleChange = (e) => {
        let text = e.target.value || "";
        if (text.startsWith(prefixText)) text = text.slice(prefixText.length);
        text = text.replace(/\D/g, "").slice(0, maxLength);
        onChange?.(text); // al Form le llega solo el número
      };
  
      return (
        <Input
          {...rest}
          ref={ref}
          value={display}
          onChange={handleChange}
          inputMode="numeric"
          style={{ width: "100%" }}
          // <span /> en vez de null: si el suffix cambia entre null y un
          // elemento, AntD re-monta el input y pierde el foco al tipear
          suffix={isValid ? <CheckCircleFilled style={{ color: "#40B394" }} /> : <span />}
        />
      );
    }
  );