export async function callMethodSafe(contract, signature, args = []) {
  try {
    if (!(signature in contract.methods)) {
      return null;
    }

    const result = await contract.methods[signature](...args).call();
    return result;
  } catch (err) {
    return null;
  }
}
