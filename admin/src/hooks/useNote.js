import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useFetchClient, useNotification } from '@strapi/helper-plugin';

import { pluginId } from '../pluginId';

const buildQueryKey = (args) => {
	return args.filter((a) => a);
};

export const useNote = () => {
	const toggleNotification = useNotification();
	const { del, post, put, get } = useFetchClient();
	const queryClient = useQueryClient();

	function onSuccessHandler({ queryKey, notification }) {
		queryClient.invalidateQueries(queryKey);
		toggleNotification({
			type: notification.type,
			message: notification.message,
		});
	}

	function onErrorHandler(error) {
		toggleNotification({
			type: 'warning',
			message: error.response?.error?.message || error.message || { id: 'notification.error' },
		});
	}

	function getNotes(params = {}) {
		return useQuery({
			queryKey: buildQueryKey([pluginId, params.filters.entitySlug, params.filters.entityId]),
			queryFn: function () {
				return get(`/${pluginId}/notes`, {
					params,
				});
			},
			select: function ({ data }) {
				return data.data;
			},
		});
	}

	const { mutateAsync: createNote } = useMutation({
		mutationFn: function (body) {
			return post(`/${pluginId}/notes`, { data: body });
		},
		onSuccess: ({ data: response }) => {
			const { data } = response;
			const queryKey = buildQueryKey([
				pluginId,
				data.attributes.entitySlug,
				data.attributes.entityId,
			]);

			onSuccessHandler({
				queryKey,
				notification: {
					type: 'success',
					message: 'Note has been successfully created',
				},
			});
		},
		onError: onErrorHandler,
	});

	const { mutateAsync: updateNote } = useMutation({
		mutationFn: function ({ id, body }) {
			return put(`/${pluginId}/notes/${id}`, { data: body });
		},
		onSuccess: ({ data: response }) => {
			const { data } = response;
			const queryKey = buildQueryKey([
				pluginId,
				data.attributes.entitySlug,
				data.attributes.entityId,
			]);

			onSuccessHandler({
				queryKey,
				notification: {
					type: 'success',
					message: 'Note has been successfully updated',
				},
			});
		},
		onError: onErrorHandler,
	});

	const { mutateAsync: deleteNote } = useMutation({
		mutationFn: function ({ id }) {
			return del(`/${pluginId}/notes/${id}`);
		},
		onSuccess: ({ data: response }) => {
			const { data } = response;
			const queryKey = buildQueryKey([
				pluginId,
				data.attributes.entitySlug,
				data.attributes.entityId,
			]);

			onSuccessHandler({
				queryKey,
				notification: {
					type: 'success',
					message: 'Note has been successfully deleted.',
				},
			});
		},
		onError: onErrorHandler,
	});

	return { getNotes, createNote, updateNote, deleteNote };
};
