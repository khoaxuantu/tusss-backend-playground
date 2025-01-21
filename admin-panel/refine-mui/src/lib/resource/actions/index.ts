"use server";

import { AuthProviderServer } from "@lib/auth/providers";
import { ManyDataException, OneDataException } from "@lib/errors/data-provider.exception";
import { HeadersAdapter } from "@lib/resource/providers/adapter/headers.adapter";
import { DataProviderServer } from "@lib/resource/providers/server";
import { DataProviderServerResponse, ResourcePaginate } from "@lib/resource/types/api.type";
import {
  BaseRecord,
  CreateParams,
  DeleteOneParams,
  GetListParams,
  GetManyParams,
  GetOneParams,
  UpdateParams,
} from "@refinedev/core";

export async function getList<T extends BaseRecord = BaseRecord>(
  params: GetListParams,
): Promise<DataProviderServerResponse<T>["getList"]> {
  return AuthProviderServer.withAuthHandler<DataProviderServerResponse<T>["getList"]>(async () => {
    if (!params.meta) params.meta = { headers: await new HeadersAdapter().transform() };
    else params.meta.headers = await new HeadersAdapter(params.meta).transform();

    const res = await DataProviderServer.getList(params);

    if (!res.ok) {
      const obj = ManyDataException.create(res).toPlainObject();
      return obj;
    }

    const data = (await res.json()) as ResourcePaginate;

    return {
      ok: true,
      data: data.docs,
      total: data.totalDocs,
    };
  });
}

export async function getOne<T extends BaseRecord = BaseRecord>(
  params: GetOneParams,
): Promise<DataProviderServerResponse<T>["getOne"]> {
  return AuthProviderServer.withAuthHandler<DataProviderServerResponse<T>["getOne"]>(async () => {
    if (!params.meta) params.meta = { headers: await new HeadersAdapter().transform() };
    else params.meta.headers = await new HeadersAdapter(params.meta).transform();

    const res = await DataProviderServer.getOne(params);

    if (!res.ok) return OneDataException.create(res).toPlainObject();

    const data = await res.json();

    return { ok: true, data };
  });
}

export async function getMany<T extends BaseRecord = BaseRecord>(
  params: GetManyParams,
): Promise<DataProviderServerResponse<T>["getMany"]> {
  return AuthProviderServer.withAuthHandler<DataProviderServerResponse<T>["getMany"]>(async () => {
    if (!params.meta) params.meta = { headers: new HeadersAdapter().transform() };
    else params.meta.headers = await new HeadersAdapter(params.meta).transform();

    const res = await DataProviderServer.getMany(params);

    if (!res.ok) return ManyDataException.create(res).toPlainObject();

    const data = (await res.json()) as ResourcePaginate;

    return { ok: true, data: data.docs };
  });
}

export async function create<T extends BaseRecord = BaseRecord>(
  params: CreateParams,
): Promise<DataProviderServerResponse<T>["create"]> {
  return AuthProviderServer.withAuthHandler<DataProviderServerResponse<T>["create"]>(async () => {
    if (!params.meta) params.meta = { headers: new HeadersAdapter().transform() };
    else params.meta.headers = await new HeadersAdapter(params.meta).transform();

    const res = await DataProviderServer.create(params);

    if (!res.ok) return OneDataException.create(res).toPlainObject();

    const data = await res.json();

    return { ok: true, data };
  });
}

export async function update<T extends BaseRecord = BaseRecord>(
  params: UpdateParams,
): Promise<DataProviderServerResponse<T>["update"]> {
  return AuthProviderServer.withAuthHandler<DataProviderServerResponse<T>["update"]>(async () => {
    if (!params.meta) params.meta = { headers: new HeadersAdapter().transform() };
    else params.meta.headers = await new HeadersAdapter(params.meta).transform();

    const res = await DataProviderServer.update(params);

    if (!res.ok) return OneDataException.create(res).toPlainObject();

    const data = await res.json();

    return { ok: true, data };
  });
}

export async function deleteOne<T extends BaseRecord = BaseRecord>(
  params: DeleteOneParams,
): Promise<DataProviderServerResponse<T>["deleteOne"]> {
  return AuthProviderServer.withAuthHandler<DataProviderServerResponse<T>["deleteOne"]>(
    async () => {
      if (!params.meta) params.meta = { headers: new HeadersAdapter().transform() };
      else params.meta.headers = await new HeadersAdapter(params.meta).transform();

      const res = await DataProviderServer.deleteOne(params);

      if (!res.ok) return OneDataException.create(res).toPlainObject();

      const data = await res.json();

      return { ok: true, data };
    },
  );
}
