import { __toESM, require_core } from "../../core-Bd4l5kNc.js";
import { execSync } from "node:child_process";

//#region src/utils/git/add-files-to-git.ts
var import_core = /* @__PURE__ */ __toESM(require_core(), 1);
/**
* Adds the specified files to the current Git staging area using the `git add` command.
*
* @param files - An array of file paths to add to Git.
* @remarks
* - If the `files` array is empty, the function logs a message and returns without performing any action.
* - If an error occurs during the execution of the `git add` command, the error is logged and the process exits with code 1.
*/
function addFilesToGit(files = ["."]) {
	return new Promise((resolve, reject) => {
		if (!files || files.length === 0) {
			(0, import_core.info)("No files to add to git.");
			resolve();
			return;
		}
		try {
			execSync(`git add ${files.join(" ")}`, { stdio: "inherit" });
			(0, import_core.info)(`Added files to git: ${files.join(", ")}`);
			resolve();
		} catch (err) {
			(0, import_core.error)(err instanceof Error ? err : `Error adding files to git: ${err}`);
			reject(err);
		}
	});
}

//#endregion
export { addFilesToGit };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWZpbGVzLXRvLWdpdC5qcyIsIm5hbWVzIjpbImZpbGVzOiBzdHJpbmdbXSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9naXQvYWRkLWZpbGVzLXRvLWdpdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmZvLCBlcnJvciB9IGZyb20gJ0BhY3Rpb25zL2NvcmUnXG5pbXBvcnQgeyBleGVjU3luYyB9IGZyb20gJ25vZGU6Y2hpbGRfcHJvY2Vzcydcbi8qKlxuICogQWRkcyB0aGUgc3BlY2lmaWVkIGZpbGVzIHRvIHRoZSBjdXJyZW50IEdpdCBzdGFnaW5nIGFyZWEgdXNpbmcgdGhlIGBnaXQgYWRkYCBjb21tYW5kLlxuICpcbiAqIEBwYXJhbSBmaWxlcyAtIEFuIGFycmF5IG9mIGZpbGUgcGF0aHMgdG8gYWRkIHRvIEdpdC5cbiAqIEByZW1hcmtzXG4gKiAtIElmIHRoZSBgZmlsZXNgIGFycmF5IGlzIGVtcHR5LCB0aGUgZnVuY3Rpb24gbG9ncyBhIG1lc3NhZ2UgYW5kIHJldHVybnMgd2l0aG91dCBwZXJmb3JtaW5nIGFueSBhY3Rpb24uXG4gKiAtIElmIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgYGdpdCBhZGRgIGNvbW1hbmQsIHRoZSBlcnJvciBpcyBsb2dnZWQgYW5kIHRoZSBwcm9jZXNzIGV4aXRzIHdpdGggY29kZSAxLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkRmlsZXNUb0dpdChmaWxlczogc3RyaW5nW10gPSBbJy4nXSk6IFByb21pc2U8dm9pZD4ge1xuICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmICghZmlsZXMgfHwgZmlsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBpbmZvKCdObyBmaWxlcyB0byBhZGQgdG8gZ2l0LicpXG4gICAgICByZXNvbHZlKClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBleGVjU3luYyhgZ2l0IGFkZCAke2ZpbGVzLmpvaW4oJyAnKX1gLCB7IHN0ZGlvOiAnaW5oZXJpdCcgfSlcbiAgICAgIGluZm8oYEFkZGVkIGZpbGVzIHRvIGdpdDogJHtmaWxlcy5qb2luKCcsICcpfWApXG4gICAgICByZXNvbHZlKClcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyIDogYEVycm9yIGFkZGluZyBmaWxlcyB0byBnaXQ6ICR7ZXJyfWApXG4gICAgICByZWplY3QoZXJyKVxuICAgIH1cbiAgfSlcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVVBLFNBQWdCLGNBQWNBLFFBQWtCLENBQUMsR0FBSSxHQUFpQjtBQUNwRSxRQUFPLElBQUksUUFBYyxDQUFDLFNBQVMsV0FBVztBQUM1QyxNQUFJLENBQUMsU0FBUyxNQUFNLFdBQVcsR0FBRzt5QkFDM0IsMEJBQTBCO0dBQy9CLFNBQVM7QUFDVDtFQUNEO0FBRUQsTUFBSTtHQUNGLFNBQVMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxLQUFLLElBQUksRUFBRSxFQUFFLEVBQUUsT0FBTyxVQUFXLEVBQUM7eUJBQ3ZELENBQUMsb0JBQW9CLEVBQUUsTUFBTSxLQUFLLEtBQUssRUFBRSxDQUFDO0dBQy9DLFNBQVM7RUFDVixTQUFRLEtBQUs7MEJBQ04sZUFBZSxRQUFRLE1BQU0sQ0FBQywyQkFBMkIsRUFBRSxLQUFLLENBQUM7R0FDdkUsT0FBTyxJQUFJO0VBQ1o7Q0FDRjtBQUNGIn0=