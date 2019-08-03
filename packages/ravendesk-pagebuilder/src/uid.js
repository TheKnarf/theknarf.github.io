let uid = 0;

export default () => {
	uid++;
	return `uid-${uid}`;
}
