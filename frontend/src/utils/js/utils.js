export const handleValueChange = (context, name, value) => {
  context.setState({[name]: value});
};
