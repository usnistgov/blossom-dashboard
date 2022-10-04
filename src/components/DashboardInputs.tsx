import { createStyles, Select, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    height: "auto",
    paddingTop: 18,
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

export default function ContainedInputs() {
  // You can add these classes as classNames to any Mantine input, it will work the same
  const { classes } = useStyles();

  return (
    <div>
      <TextInput label="input1" placeholder="input1" classNames={classes} />

      <Select
        style={{ marginTop: 20, zIndex: 2 }}
        data={["1", "2", "3", "4"]}
        placeholder="Pick one"
        label="input2"
        classNames={classes}
      />

      <DatePicker
        style={{ marginTop: 20 }}
        label="input3"
        placeholder="input3"
        classNames={classes}
        clearable={false}
      />
    </div>
  );
}
