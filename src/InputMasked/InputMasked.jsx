import React from "react";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";
import InputWrapper from "../InputWrapper";
import { ValidationContext } from "../Forms/Validation";
import classNames from "../utils/classNames";
import formData from "../utils/formData";

export default function InputMasked({
  id,
  label,
  type,
  placeholder,
  name,
  iconName,
  defaultValue,
  rel,
  mask,
  maskChar,
  onChange,
  validateOnChange,
  onBlur,
  validateOnBlur,
  autoComplete
}) {
  const basic = classNames(["masked-input", true], ["icon-padding", iconName]);

  return (
    <ValidationContext.Consumer>
      {({ validate, cleanField, errors: { [id]: error } }) => (
        <InputWrapper error={error} id={id} iconName={iconName} label={label}>
          <InputMask
            mask={mask}
            maskChar={maskChar}
            onChange={e => {
              if (validateOnChange) {
                validate(formData(e.target.form || {}), e.target.id);
              } else {
                cleanField(e.target.id);
              }
              onChange(e);
            }}
            onBlur={e => {
              if (validateOnBlur) {
                validate(formData(e.target.form || {}), e.target.id);
              }
              onBlur(e);
            }}
            {...(defaultValue && { defaultValue })}
          >
            {inherited => (
              <input
                autoComplete={autoComplete ? "on" : "off"}
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                className={basic}
                ref={rel}
                {...inherited}
              />
            )}
          </InputMask>
        </InputWrapper>
      )}
    </ValidationContext.Consumer>
  );
}

InputMasked.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  iconName: PropTypes.string,
  mask: PropTypes.string,
  maskChar: PropTypes.string,
  onChange: PropTypes.func,
  validateOnChange: PropTypes.bool,
  onBlur: PropTypes.func,
  validateOnBlur: PropTypes.bool,
  autoComplete: PropTypes.bool,
  rel: PropTypes.shape({})
};

InputMasked.defaultProps = {
  type: "",
  name: "default",
  placeholder: "",
  label: "",
  defaultValue: "",
  iconName: "",
  mask: "",
  maskChar: "",
  onChange: () => {},
  validateOnChange: true,
  onBlur: () => {},
  validateOnBlur: true,
  autoComplete: false,
  rel: React.createRef()
};
