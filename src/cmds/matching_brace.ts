import { workspace } from 'coc.nvim';
import { Cmd, Ctx, isRustDocument } from '../ctx';
import * as ra from '../rust-analyzer-api';

export function matchingBrace(ctx: Ctx): Cmd {
  return async () => {
    const { document, position } = await workspace.getCurrentState();
    if (!isRustDocument(document)) return;

    const params: ra.FindMatchingBraceParams = {
      textDocument: { uri: document.uri },
      offsets: [position],
    };

    const response = await ctx.client.sendRequest(ra.findMatchingBrace, params);
    if (response.length > 0) {
      workspace.jumpTo(document.uri, response[0]);
    }
  };
}
